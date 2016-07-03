post "/websites" do
  p params
  nokogiri_ify(params[:url])
  fetch_title(@document)
  fetch_body(@document)
  if request.xhr?
    @text_array = array_ify(@body)
    p @text_array[25]
    p @text_array[24]
    p @text_array[26]
    {text_array: @text_array, title: @title}.to_json
    # erb :"/index"
  end
end

