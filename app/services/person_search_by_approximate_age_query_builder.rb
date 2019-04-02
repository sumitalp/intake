# frozen_string_literal: true

# PeopleSearchByApproximateAgeQueryBuilder is a service class responsible for creation
# of an elastic search approximate age query
module PersonSearchByApproximateAgeQueryBuilder
  attr_reader :approximate_age, :approximate_age_units

  def build_query(builder)
    builder.payload[:query][:bool][:must].concat(must)
  end

  def query
    { bool: { must: must } }
  end

  def must
    return [] if approximate_age.blank? || approximate_age_units.blank?
    [range_query].flatten.compact
  end

  def range_query
    @date_range = date_range(approximate_age.to_i, approximate_age_units)

    {
      range: {
        date_of_birth: {
          gte: @date_range[0],
          lte: @date_range[1],
          format: 'yyyy-MM-dd'
        }
      }
    }
  end

  def date_range(age, units)
    @offset = calculate_offset(age, units)
    @approx_birth_date = calculate_birth_date(age, units)

    gte_lte_dates(units, @approx_birth_date, @offset)
  end

  def calculate_birth_date(age, units)
    if units == 'months'
      Date.current - age.months
    elsif units == 'years'
      Date.current - age.years
    end
  end

  def gte_lte_dates(units, birth_date, offset)
    if units == 'months'
      @offset_with_units = offset.months
    elsif units == 'years'
      @offset_with_units = offset.years
    end

    @gte_date = calculate_gte_date(birth_date, @offset_with_units)
    @lte_date = calculate_lte_date(birth_date, @offset_with_units)

    [@gte_date, @lte_date]
  end

  def calculate_gte_date(birth_date, offset_with_units)
    @gte_date = (birth_date - offset_with_units).iso8601
  end

  def calculate_lte_date(birth_date, offset_with_units)
    @lte_date = (birth_date + offset_with_units).iso8601

    if date_in_future?(@lte_date)
      Date.current.iso8601
    else
      @lte_date
    end
  end

  def date_in_future?(date)
    Date.iso8601(date) > Date.current
  end

  def calculate_offset(age, units)
    if units == 'months'
      6
    elsif age >= 0 && age <= 12
      2
    elsif age > 12
      5
    end
  end
end
