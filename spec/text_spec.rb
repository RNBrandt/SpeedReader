require 'spec_helper'
require 'capybara/rspec'
require 'selenium-webdriver'

describe 'Post#websites' do
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

feature 'header' do
  scenario 'has all elements' do
    visit('/')
    expect(page).to have_css(".header-basic")
    expect(find(".header-basic")).to have_content("Speed")
    expect(find(".header-basic")).to have_content("Email")
    expect(find(".header-basic")).to have_content("GitHub")
    expect(find(".header-basic")).to have_content("Website")
    expect(find(".header-basic")).to have_content("LinkedIn")
  end
  scenario 'has functional github link' do
    visit ('/')
    within(".header-basic") do
      click_link("GitHub")
      expect(page).to have_current_path("https://github.com/RNBrandt", options = {:url=>true})
      # expect(find(".vcard-username")).to have_content("RNBrandt")
    end
  end
  scenario 'has functional website link' do
    visit ('/')
    within(".header-basic") do
      click_link("Website")
      expect(page).to have_current_path("http://rnbrandt.github.io", options = {:url=>true})
      # expect(find(".vcard-username")).to have_content("RNBrandt")
    end
  end
  scenario 'has functional LinkedIn link' do
    visit ('/')
    within(".header-basic") do
      click_link("LinkedIn")
      expect(page).to have_current_path("https://www.linkedin.com/in/reubenbrandt", options = {:url=>true})
    end
  end
end

feature 'footer' do
  scenario 'has all elements' do
    visit('/')
    expect(page).to have_css(".footer-basic-centered")
    expect(find(".footer-basic-centered")).to have_content("Created By Reuben Brandt")
    expect(find(".footer-basic-centered")).to have_content("Email")
    expect(find(".footer-basic-centered")).to have_content("GitHub")
    expect(find(".footer-basic-centered")).to have_content("Website")
  end
  scenario 'has functional github link' do
    visit ('/')
    within(".footer-basic-centered") do
      click_link("GitHub")
      expect(page).to have_current_path("https://github.com/RNBrandt", options = {:url=>true})
    end
  end
  scenario 'has functional website link' do
    visit ('/')
    within(".footer-basic-centered") do
      click_link("Website")
      expect(page).to have_current_path("http://rnbrandt.github.io", options = {:url=>true})
    end
  end
  scenario 'has functional LinkedIn link' do
    visit ('/')
    within(".footer-basic-centered") do
      click_link("LinkedIn")
      expect(page).to have_current_path("https://www.linkedin.com/in/reubenbrandt", options = {:url=>true})
    end
  end
end

feature 'body' do
  scenario 'has jumbotron with proper content' do
    visit ('/')
    expect(page).to have_css(".jumbotron")
    expect(find(".jumbotron")).to have_content("Directions")
    expect(page).to have_field('url', with: "http://www.bbc.com/news/magazine-35261648")
    expect(find(".jumbotron")).to have_button("Submit")
  end
  scenario 'has proper jumbotron content hidden' do
    visit ('/')
    expect(find(".jumbotron")).to_not have_button("#start-button")
    expect(find(".jumbotron")).to_not have_button("#stop")
    expect(find(".jumbotron")).to_not have_button("#pause")
    expect(find(".jumbotron")).to_not have_button("#WPM")
    expect(find(".jumbotron")).to_not have_button("#text-center")
  end
end

feature 'submit button' do
  scenario 'will load a page with the correct content' do
    visit ('/')
    click_button('Submit')
    sleep 3.seconds
    expect(find(".jumbotron")).to_not have_content("Directions")
    expect(page).to_not have_field('url', with: "http://www.bbc.com/news/magazine-35261648")
    expect(find(".jumbotron")).to_not have_button("Submit")
    expect(find(".jumbotron")).to have_css("#reading")
    expect(find("#ready-to-read")).to have_content("Ready to Read")
    expect(find(".jumbotron")).to have_css("#WPM")
    expect(find('.jumbotron #WPM')).to have_css('.btn-group')
    expect(find(".btn-group")).to have_button("Start Reading!")
    expect(find(".btn-group")).not_to have_button("Pause")
    expect(find(".btn-group")).not_to have_button("Stop")
  end
end

feature 'WPM box' do
  scenario 'will change slider value' do
    visit ('/')
    click_button('Submit')
    sleep 3.seconds
    within(:css, "#WPM") do
      fill_in 'wpmBox', with: 200
    end
    expect(find('#WPM')).to have_field('slider', with: 200)
  end
end

feature 'Start-Reading Button' do
  scenario 'will create the proper fields' do
    visit ('/')
    click_button('Submit')
    sleep 3.seconds
    within(:css, "#WPM") do
      fill_in 'wpmBox', with: 200
    end
    click_button('Start Reading!')
    sleep (0.5).seconds
    expect(find(".btn-group")).to have_button("Pause")
    expect(find(".btn-group")).not_to have_button("Start Reading!")
    expect(find(".btn-group")).to have_button("Stop")
    expect(find('#WPM')).not_to have_field('slider')
    expect(find('#WPM')).to have_field('wpmBox', with: 200)
    expect(find('#reading')).to have_css('.panel.panel-default.center-block')
    click_button("Pause")
  end
  scenario 'will fill the text area with content' do
    expect('#text-object.text-center').to be_truthy
  end
end

feature 'Pause Button' do
  scenario 'will become a resume button when pressed' do
    visit ('/')
    click_button('Submit')
    sleep 3.seconds
    within(:css, "#WPM") do
      fill_in 'wpmBox', with: 200
    end
    click_button('Start Reading!')
    sleep (0.1).seconds
    click_button('Pause')
    # sleep (20).seconds
    expect(find(".btn-group")).to have_button("Resume")
  end
end

feature 'Resume Button' do
  scenario 'will become a pause button when pressed' do
    visit ('/')
    click_button('Submit')
    sleep 3.seconds
    within(:css, "#WPM") do
      fill_in 'wpmBox', with: 200
    end
    click_button('Start Reading!')
    sleep (0.1).seconds
    click_button('Pause')
    # sleep (20).seconds
    expect(find(".btn-group")).to have_button("Resume")
    click_button('Resume')
    expect(find(".btn-group")).to have_button("Pause")
  end
end

feature 'Stop Button' do
  scenario 'will return user to the first page' do
    visit ('/')
    click_button('Submit')
    sleep 3.seconds
    click_button('Start Reading!')
    click_button('Stop')
    expect(find(".jumbotron")).to have_content("Directions")
    expect(page).to have_field('url', with: "http://www.bbc.com/news/magazine-35261648")
    expect(find(".jumbotron")).to have_button("Submit")
  end
end


