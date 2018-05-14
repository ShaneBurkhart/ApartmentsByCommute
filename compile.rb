require "airrecord"
require "google-maps"

# docker needs stdout to sync to get logs.
$stdout.sync = true

AIRTABLES_APP_ID = "appg3SEpBOIqhk2TN"
Airrecord.api_key = ENV["AIRTABLES_API_KEY"]

Google::Maps.configure do |config|
  config.api_key = ENV["GOOGLE_MAPS_API_KEY"]
end

class Apartment < Airrecord::Table
  self.base_key = AIRTABLES_APP_ID
  self.table_name = "Apartments"
end

PUBLIC_DATA_JS_FILENAME = "public/apartments.js"

f = File.new(PUBLIC_DATA_JS_FILENAME, "w")
f.truncate(0)

f.write("var APARTMENT_DATA = [")

apartments = Apartment.all.each do |apt|
  if !apt.fields["Lat"].nil? and !apt.fields["Lng"].nil?
    puts "Already geocoded #{apt.fields["Name"]}"
    f.write(apt.fields.to_json)
    f.write(",")
    next
  end

  #location = Google::Maps::Location.find(apt.fields["Address"]).first
  #next if location.nil?

  #apt["Lat"] = location.latitude.to_s
  #apt["Lng"] = location.longitude.to_s

  #puts "#{location.latitude},#{location.longitude} - #{apt.fields["Address"]}"

  #apt.save

  #f.write(apt.fields)
  #f.write(",")
end

f.write("];")
f.close
