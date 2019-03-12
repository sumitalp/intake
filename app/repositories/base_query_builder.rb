# frozen_string_literal: true

# parent class for dora search
class BaseQueryBuilder
  include QueryBuilderHelper

  attr_reader :search_term, :search_after, :is_client_only, :payload,
              :params, :city, :county, :street, :client_id, :date_of_birth

  def self.build(params = {})
    builder = new(params)
    build_base(builder)
    if builder.client_id_searched?.blank? && builder.address_searched?
      builder.extend(PersonSearchByAddress).build_query(builder)
    end
    builder
  end

  # instance methods
  def initialize(params = {})
    @params = params.with_indifferent_access
    initialize_search
    initialize_name_ssn_client_id
    initialize_age_gender
    initialize_address
    @payload = build_query
  end

  def initialize_search
    @search_term              = params.dig(:person_search_fields, :search_term)
    @search_after             = params[:search_after]
    @is_client_only           = params.fetch(:is_client_only, 'true') == 'true'
  end

  def initialize_name_ssn_client_id
    @client_id                = params.dig(:person_search_fields, :client_id)
    @last_name                = params.dig(:person_search_fields, :last_name)
    @first_name               = params.dig(:person_search_fields, :first_name)
    @middle_name              = params.dig(:person_search_fields, :middle_name)
    @suffix                   = params.dig(:person_search_fields, :suffix)
    @ssn                      = params.dig(:person_search_fields, :ssn)
  end

  def initialize_age_gender
    @date_of_birth            = params.dig(:person_search_fields, :date_of_birth)
    @approximate_age          = params.dig(:person_search_fields, :approximate_age)
    @approximate_age_units    = params.dig(:person_search_fields, :approximate_age_units)
    @sex_at_birth             = params.dig(:person_search_fields, :sex_at_birth)
  end

  def initialize_address
    return unless address_searched?
    @street                   = params.dig(:person_search_fields, :street)
    @city                     = params.dig(:person_search_fields, :city)
    @county                   = params.dig(:person_search_fields, :county)
    @state                    = params.dig(:person_search_fields, :state)
    @country                  = params.dig(:person_search_fields, :country)
    @zip_code                 = params.dig(:person_search_fields, :zip_code)
  end

  def advanced_search_on?
    params.fetch(:is_advanced_search_on, 'false') == 'true'
  end

  def address_searched?
    [
        params.dig(:person_search_fields, :street), params.dig(:person_search_fields, :city),
        params.dig(:person_search_fields, :county), params.dig(:person_search_fields, :state),
        params.dig(:person_search_fields, :country), params.dig(:person_search_fields, :zip_code)
    ].any?(&:present?)
  end

  def client_id_searched?
    params.dig(:person_search_fields, :client_id).present?
  end

  def ssn_searched?
    params.dig(:person_search_fields, :ssn).present?
  end

  def build_query
    {
        size: SIZE, track_scores: TRACK_SCORES, sort: [{ _score: 'desc', _uid: 'desc' }],
        _source: fields, highlight: highlight
    }.tap { |query| query[:search_after] = @search_after if @search_after }
  end

  def auto_bar_highlight
    { 'matched_fields':
        ['autocomplete_search_bar',
      'autocomplete_search_bar.phonetic',
      'autocomplete_search_bar.diminutive'] }
  end

  def fields
    %w[id legacy_source_table first_name middle_name last_name name_suffix gender akas
       date_of_birth date_of_death ssn languages races ethnicity client_counties
       addresses.id addresses.effective_start_date addresses.street_name addresses.street_number
       addresses.city addresses.county addresses.state_code addresses.zip addresses.type
       addresses.legacy_descriptor addresses.phone_numbers.number addresses.phone_numbers.type
       csec.start_date csec.end_date csec.csec_code_id csec.description
       legacy_descriptor highlight phone_numbers.id phone_numbers.number
       phone_numbers.type sensitivity_indicator race_ethnicity open_case_responsible_agency_code]
  end

  def highlight
    { order: 'score',
      number_of_fragments: NUMBER_OF_FRAGMENTS,
      require_field_match: REQUIRE_FIELD_MATCH,
      fields: { autocomplete_search_bar: auto_bar_highlight, searchable_date_of_birth: {} } }
  end
end