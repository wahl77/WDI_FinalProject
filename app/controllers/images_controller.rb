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
    redirect_to root_url
  end

  def search
    sentence = params[:search]
    new_sentence = sentence.split(" ").to_a
    @images_array = []
    new_sentence.each do |word|
      if (word != "The") && (word != "the") && (word != "for") && (word != "For") && (word != "of") && (word != "and") && (word != "And") && (word != "Of") && (word != "Or") && (word != "or") && (word != "because") && (word != "Because") && (word != "a") && (word != "A") && (word != "He") && (word != "he") && (word != "she") && (word != "She") && (word != "That") && (word != "that") && (word != "those") && (word != "Those") && (word != "either") && (word != "Either") && (word != "Your") && (word != "your")
        @images_array << Image.caption_search(word).results
      end
    end

    @images_array.each do |value|
      @images_array.delete(value) if value.empty?
    end

    render json: @images_array

    # fix solr to search for each word. if not, feed each that isnt an article into an array
    # only have that image.lat in there until we have allowed user to pick their location
    # send json with array of images to images.js then add markers there
  end
end
