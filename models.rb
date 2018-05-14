require 'airrecord'

AIRTABLES_APP_ID = "appTAmLzyXUW1RxaH"
Airrecord.api_key = ENV["AIRTABLES_API_KEY"]

class Feedback < Airrecord::Table
  self.base_key = AIRTABLES_APP_ID
  self.table_name = "Feedback"
end

