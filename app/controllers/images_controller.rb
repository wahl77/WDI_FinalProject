class ImagesController < ApplicationController
  skip_before_filter :require_login

  def new
    @image = Image.new(params[:image])
    @image.user = current_user
    @image.save
  end

  def update
    @image = Image.find(params[:image_id])
    @image.update_attribute(:caption, params[:caption])
  end

  def search
    sentence = params[:search]
    new_sentence = sentence.split(" ").to_a
    @images_array = []
    new_sentence.each do |word|
      if (word != "The") && (word != "the") && (word != "for") && (word != "For") && (word != "of") && (word != "and") && (word != "And") && (word != "Of") && (word != "Or") && (word != "or") && (word != "because") && (word != "Because") && (word != "a") && (word != "A") && (word != "He") && (word != "he") && (word != "she") && (word != "She") && (word != "That") && (word != "that") && (word != "those") && (word != "Those") && (word != "either") && (word != "Either") && (word != "Your") && (word != "your")
        @images_array.concat(Image.caption_search(word).results)
      end
    end

    render json: @images_array.uniq

    # fix solr to search for each word. if not, feed each that isnt an article into an array
    # only have that image.lat in there until we have allowed user to pick their location
    # send json with array of images to images.js then add markers there
  end

  def choose_image_location
    @image = Image.find(params[:id])
    @image.update_attributes(:lat => 35, :long => 102)
    redirect_to map_location_url(@image.id)
  end

  def save_location
    @image = Image.find(params[:url].split("/")[-1])
    @image.update_attributes(:lat => params[:lat], :long => params[:lng])
    redirect_to root_url
  end

end
