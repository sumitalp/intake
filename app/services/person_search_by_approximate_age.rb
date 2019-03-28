#frozen_string_literal: true

# PeopleSearchByApproximateAgeQueryBuilder is a service class responsible for creation
# of an elastic search approximate age query
module PersonSearchByApproximateAgeQueryBuilder
    attr_reader :approximate_age, :approximate_age_units

    def build_query(builder)
        builder.payload[:query][:bool][:must].concat(must)
    end

    def must
        return if approximate_age.blank? || approximate_age_units.blank?

        [generate_range].flatten.compact
    end

    def generate_range
        #take care of the edge cases
        puts "#{Date.current.year} #{Date.current.mon} #{Date.current.mday}"
        if approximate_age_units == 'years'
            @approx_age = approximate_age.to_i
            puts "#{@approx_age}"
            @year = Date.current.year
            @month = Date.current.mon
            @day = Date.current.mday
            if @approx_age > 0 && @approx_age < 12
                @offset = 2
            elsif @approx_age >= 12
                @offset = 5
            end
            @gte_year = @year - (@approx_age + @offset)
            @lte_year = @year - (@approx_age - @offset)
            @gte_date = Date.new(@gte_year, @month, @day).iso8601
            @lte_date = Date.new(@lte_year, @month, @day).iso8601
        elsif approximate_age_units == 'months'
            @approx_age = approximate_age.to_i
            puts "#{@approx_age}"
            @year = Date.current.year
            @month = Date.current.mon
            @day = Date.current.mday
            @offset = 1
            @gte_year = @year #if offset brings the date into the prev/next year, change year
            @lte_year = @year #if offset brings the date into the prev/next year, change year
            @gte_month = @month - (@approx_age + @offset)
            @lte_month = @month - (@approx_age - @offset)
            @gte_date = Date.new(@gte_year, @gte_month, @day).iso8601
            @lte_date = Date.new(@lte_year, @lte_month, @day).iso8601
        end

        {
            range: {
                date_of_birth: {
                    gte: @gte_date,
                    lte: @lte_date,
                    format: 'yyyy-MM-dd'
                }
            }
        }
    end
end
