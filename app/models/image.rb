class Image < ActiveRecord::Base
  attr_accessible :url, :caption, :lat, :long
  belongs_to :imageable, polymorphic: true
  belongs_to :user

  mount_uploader :url, ImageUploader

  after_create :extract_exif_info


  searchable do
    text :caption
  end
  
  def self.cool_search(query)
    self.search do 
      fulltext query
    end
  end

  def extract_exif_info
    img = Magick::Image.read(File.join(Rails.root, "public", self.url.url))[0]
    return unless img


    img_lat = img.get_exif_by_entry('GPSLatitude')[0][1].split(', ') rescue nil
    img_lng = img.get_exif_by_entry('GPSLongitude')[0][1].split(', ') rescue nil
 
    lat_ref = img.get_exif_by_entry('GPSLatitudeRef')[0][1] rescue nil
    lng_ref = img.get_exif_by_entry('GPSLongitudeRef')[0][1] rescue nil
 
    return unless img_lat && img_lng && lat_ref && lng_ref
 
    latitude = to_frac(img_lat[0]) + (to_frac(img_lat[1])/60) + (to_frac(img_lat[2])/3600)
    longitude = to_frac(img_lng[0]) + (to_frac(img_lng[1])/60) + (to_frac(img_lng[2])/3600)
 
    latitude = latitude * -1 if lat_ref == 'S'  # (N is +, S is -)
    longitude = longitude * -1 if lng_ref == 'W'   # (W is -, E is +)
 

    self.lat = latitude
    self.long = longitude
    

    self.save
  end 

  def to_frac(strng)
    numerator, denominator = strng.split('/').map(&:to_f)
    denominator ||= 1
    numerator/denominator
  end

end
