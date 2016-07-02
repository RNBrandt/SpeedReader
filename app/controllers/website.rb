post "/websites" do
  p params
  nokogiri_ify(params[:url])
  fetch_title(@document)
  fetch_body(@document)
  if request.xhr?
    @text_array = array_ify(@body)
    {text_array: @text_array, title: @title}.to_json
    # erb :"/index"
  end
end

