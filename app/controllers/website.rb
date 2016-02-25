# get "/users/:id/websites" do

# end this will be on the users page.

get "/users/:id/websites/new" do

end

post "/users/:id/websites" do
  @user = User.find(session[:id])
  nokogiri_ify(params[:url])
  fetch_title(@document)
  fetch_body(@document)
  Website.new(title: @title,  body: @body, url: (params[:url]))
end


get "/users/:id/websites/:id" do

end


get "/users/:id/websites/:id/edit" do

end

put "/users/:id/websites/:id" do

end

delete "/users/:id/websites/:id" do

end
