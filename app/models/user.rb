class User < ActiveRecord::Base
  authenticates_with_sorcery! do |config|
    config.authentications_class = Authentication
  end

  attr_accessible :username, :first_name, :last_name, :password, :password_confirmation, :authentications_attributes

  validates_length_of :password, :minimum => 3, :message => "password must be at least 3 characters long", :if => :password
  validates_confirmation_of :password, :message => "should match confirmation", :if => :password

  has_many :follows

  has_many :authentications, :dependent => :destroy

  has_one :profile_pic, as: :imageable, :class_name => 'Image', dependent: :destroy
  has_one :cover_pic, as: :imageable, :class_name => 'Image', dependent: :destroy
  accepts_nested_attributes_for :profile_pic, :authentications
  attr_accessible :profile_pic_attributes

  has_many :images, dependent: :destroy

  validates :username,
    presence: true,
    uniqueness: true

  validates :password,
    #format:{with:PASSWORD_REGEX},
    presence:true, on: :create,
    confirmation:true

  # Overwritte what they wrote by downcasing every character
  def username=(value)
    write_attribute :username, value.downcase
  end

  # Overwritte what they wrote by making it a title (Upper cases when needed)
  def first_name=(value)
    write_attribute :first_name, value.titleize
  end

  # Overwritte what they wrote by making it a title (Upper cases when needed)
  def last_name=(value)
    write_attribute :last_name, value.titleize
  end


  # Get a list of all the people that follow me
  # This overwrites default getters
  def followers
    Follow.where("following_id = ?", self.id)
  end

  # Get a list of all the people I am following
  # This overwrites default getter
  def following
    Follow.where("follower_id = ?", self.id)
  end

  def followingUsers
    User.find(self.following.pluck(:following_id))
  end

  def followerUsers
    User.find(self.followers.pluck(:follower_id))
  end

  # This return their profile picture. Or a default in none are set.
  def get_image_profile_pic
    last_pic = images.where("kind = ?", "profile_pic").last

    if last_pic.nil?
      return "/assets/octacat-resized.png"
    else
      last_pic.url
    end
  end

  # def get_image_thumb
  #   last_pic =
  #   if profile_pic
  #     return profile_pic.image_url(:thumb).to_s
  #   else
  #     return "/assets/octacat-resized.png"
    # end
  # end

  # def get_image_cover_photo
  #   if cover_photo
  #     return cover_photo.image_url(:cover).to_s
  #   else
  #     return "/assets/cover2-resized.jpg"
  #   end
  # end

end
