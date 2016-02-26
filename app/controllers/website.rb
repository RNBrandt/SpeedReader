# get "/users/:id/websites" do

# end this will be on the users page.

# get "/users/:id/websites/new" do
#   @user = User.find(session[:user_id])
#   erb :"/websites/new"
# end

post "/websites" do
  p params
  # @user = User.find(session[:user_id])
  nokogiri_ify(params[:url])
  fetch_title(@document)
  fetch_body(@document)
  # @website = Website.new(title: @title,  text: @body, url: (params[:url]), user_id: (session[:user_id]))
  # if @website.save
  if request.xhr?
      @text_array = array_ify(@body)
      p @text_array
      {text_array: @text_array, title: @title}.to_json
      # erb :"/index"
  else
    "Then you don't get to use it"
  end
  # else
  #   erb :"is not working"
  # end
end


# get "/users/:id/websites/:id" do

# end


# get "/users/:id/websites/:id/edit" do

# end

# put "/users/:id/websites/:id" do

# end

# delete "/users/:id/websites/:id" do

# end
