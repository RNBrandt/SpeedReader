# get "/users/:id/websites" do

# end this will be on the users page.

get "/users/:id/websites/new" do
  @user = User.find(session[:user_id])
  erb :"/websites/new"
end

post "/users/:id/websites" do
  @user = User.find(session[:user_id])
  nokogiri_ify(params[:url])
  fetch_title(@document)
  fetch_body(@document)
  @website = Website.new(title: @title,  body: @body, url: (params[:url]), user_id: (session[:user_id]))
  if @website.save
    erb :"/index"
  else
    erb :"not_authorized"
  end
end


get "/users/:id/websites/:id" do

end


get "/users/:id/websites/:id/edit" do

end

put "/users/:id/websites/:id" do

end

delete "/users/:id/websites/:id" do

end
