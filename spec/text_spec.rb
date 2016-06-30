require 'spec_helper'

# describe WebsitesController do
  describe 'Get #websites' do
    context 'Fetches websites' do
      before do
        nokogiri_ify("http://www.bbc.com/news/magazine-35261648")
        @title = fetch_title(@document)
        @body =  fetch_body(@document)
        @text_array = array_ify(@body)
      end
      it "should retrieve the website's title" do
        expect(@title).to eq("How could I read more books?")
      end
      it "should retrieve the website's text" do
        expect(@body).to include("Agatha Christie read 200 books every year, while Facebook founder Mark Zuckerberg gets through a book a fortnight. President Theodore Roosevelt read a book a day, and increased this to two or three when he had a quiet night. But how can mere mortals get through more?")
      end
      it "should split the website's text to an array" do
        expect(@text_array).to be_a_kind_of(Array)
      end
      it "should include text from the website" do
        expect(@text_array[7]).to eq("200")
      end
    end
  end
# end
