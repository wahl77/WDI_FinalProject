class Image < ActiveRecord::Base
  attr_accessible :url
  belongs_to :imageable, polymorphic: true
  belongs_to :user

  mount_uploader :url, ImageUploader
end
