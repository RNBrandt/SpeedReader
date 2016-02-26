def nokogiri_ify(url)
  uri = URI(url)
  @document = Nokogiri.parse(Net::HTTP.get(uri))
end


def fetch_title(document)
  @title = document.css('h1').first.inner_text
end

def fetch_body(document)
  @body = document.css('p').inner_text
end
def array_ify(string)
  @text_array = string.split(" ")
end
