

post "/websites" do
  p params
  nokogiri_ify(params[:url])
  fetch_title(@document)
  fetch_body(@document)
  if request.xhr?
      @text_array = array_ify(@body)
      p @text_array
      {text_array: @text_array, title: @title}.to_json
      # erb :"/index"
  else
    "Then you don't get to use it"
  end
end

