require 'spec_helper'

# describe WebsitesController do
  describe 'Get #websites' do
    context 'Fetches websites' do
      before do
        nokogiri_ify("https://en.wikipedia.org/wiki/Speed_reading")
        @title = fetch_title(@document)
        @body =  fetch_body(@document)
      end
      it 'should retrieves the websites title' do
        expect(@title).should ==("Speed reading")
      end
    end
  end
# end
