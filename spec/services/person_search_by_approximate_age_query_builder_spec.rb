# frozen_string_literal: true

require 'rails_helper'

describe PersonSearchByApproximateAgeQueryBuilder do
  let(:approx_age_blank) { '' }
  let(:approx_age_units_blank) { '' }
  let(:approx_age_months_zero) { '0' }
  let(:approx_age_months_seven) { '7' }
  let(:approx_age_months_twenty_four) { '24' }
  let(:approx_age_years_zero) { '0' }
  let(:approx_age_years_twelve) { '12' }
  let(:approx_age_years_thirteen) { '13' }
  let(:approx_age_years_one_hundred_twenty) { '120' }

  let(:params_approx_age_blank) do
    { approximate_age: approx_age_blank, approximate_age_units: 'months' }
  end
  let(:params_approx_age_units_blank) do
    { approximate_age: approx_age_months_seven, approximate_age_units: approx_age_units_blank }
  end
  let(:params_months_zero) do
    { approximate_age: approx_age_months_zero, approximate_age_units: 'months' }
  end
  let(:params_months_seven) do
    { approximate_age: approx_age_months_seven, approximate_age_units: 'months' }
  end
  let(:params_months_twenty_four) do
    { approximate_age: approx_age_months_twenty_four, approximate_age_units: 'months' }
  end
  let(:params_years_zero) do
    { approximate_age: approx_age_years_zero, approximate_age_units: 'years' }
  end
  let(:params_years_twelve) do
    { approximate_age: approx_age_years_twelve, approximate_age_units: 'years' }
  end
  let(:params_years_thirteen) do
    { approximate_age: approx_age_years_thirteen, approximate_age_units: 'years' }
  end
  let(:params_years_one_hundred_twenty) do
    { approximate_age: approx_age_years_one_hundred_twenty, approximate_age_units: 'years' }
  end

  let(:approx_age_query_blank) { PersonSearchResultBuilder.new.approx_age_query_blank }
  let(:approx_age_query_months_zero) { PersonSearchResultBuilder.new.approx_age_query_months_zero }
  let(:approx_age_query_months_seven) do
    PersonSearchResultBuilder.new.approx_age_query_months_seven
  end
  let(:approx_age_query_months_twenty_four) do
    PersonSearchResultBuilder.new.approx_age_query_months_twenty_four
  end
  let(:approx_age_query_years_zero) { PersonSearchResultBuilder.new.approx_age_query_years_zero }
  let(:approx_age_query_years_twelve) do
    PersonSearchResultBuilder.new.approx_age_query_years_twelve
  end
  let(:approx_age_query_years_thirteen) do
    PersonSearchResultBuilder.new.approx_age_query_years_thirteen
  end
  let(:approx_age_query_years_one_hundred_twenty) do
    PersonSearchResultBuilder.new.approx_age_query_years_one_hundred_twenty
  end

  describe '.query' do
    context 'approximate age units' do
      context 'is blank' do
        context 'returns hash' do
          it 'with empty array' do
            query_builder = QueryBuilder.new(person_search_fields: params_approx_age_units_blank)
            query = query_builder.extend(described_class).query
            expect(query.as_json).to eq approx_age_query_blank['query']
          end
        end
      end
    end

    context 'approximate age' do
      context 'is blank' do
        context 'returns hash' do
          it 'with empty array' do
            query_builder = QueryBuilder.new(person_search_fields: params_approx_age_blank)
            query = query_builder.extend(described_class).query
            expect(query.as_json).to eq approx_age_query_blank['query']
          end
        end
      end

      context 'in months' do
        context 'zero months' do
          context 'returns hash' do
            it 'with query' do
              query_builder = QueryBuilder.new(person_search_fields: params_months_zero)
              query = query_builder.extend(described_class).query
              expect(query.as_json).to eq approx_age_query_months_zero['query']
            end
          end
        end

        context 'seven months' do
          context 'returns hash' do
            it 'with query' do
              query_builder = QueryBuilder.new(person_search_fields: params_months_seven)
              query = query_builder.extend(described_class).query
              expect(query.as_json).to eq approx_age_query_months_seven['query']
            end
          end
        end

        context '24 months' do
          context 'returns hash' do
            it 'with query' do
              query_builder = QueryBuilder.new(person_search_fields: params_months_twenty_four)
              query = query_builder.extend(described_class).query
              expect(query.as_json).to eq approx_age_query_months_twenty_four['query']
            end
          end
        end
      end

      context 'in years' do
        context 'zero years old' do
          context 'returns hash' do
            it 'with query' do
              query_builder = QueryBuilder.new(person_search_fields: params_years_zero)
              query = query_builder.extend(described_class).query
              expect(query.as_json).to eq approx_age_query_years_zero['query']
            end
          end
        end

        context 'twelve years old' do
          context 'returns hash' do
            it 'with query' do
              query_builder = QueryBuilder.new(person_search_fields: params_years_twelve)
              query = query_builder.extend(described_class).query
              expect(query.as_json).to eq approx_age_query_years_twelve['query']
            end
          end
        end

        context 'thirteen years old' do
          context 'returns hash' do
            it 'with query' do
              query_builder = QueryBuilder.new(person_search_fields: params_years_thirteen)
              query = query_builder.extend(described_class).query
              expect(query.as_json).to eq approx_age_query_years_thirteen['query']
            end
          end
        end

        context 'one hundred and twenty years old' do
          context 'returns hash' do
            it 'with query' do
              query_builder = QueryBuilder.new(
                person_search_fields: params_years_one_hundred_twenty
              )
              query = query_builder.extend(described_class).query
              expect(query.as_json).to eq approx_age_query_years_one_hundred_twenty['query']
            end
          end
        end
      end
    end
  end
end
