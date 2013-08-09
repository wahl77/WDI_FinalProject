class User < ActiveRecord::Base
  authenticates_with_sorcery! do |config|
    config.authentications_class = Authentication
  end

  attr_accessible :username, :first_name, :last_name, :password, :password_confirmation, :authentications_attributes

  has_many :follows

  has_many :authentications, :dependent => :destroy

  has_one :profile_pic, as: :imageable, :class_name => 'Image', dependent: :destroy
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
  def get_image
    if profile_pic
      return profile_pic.url.thumb.to_s
    else
      return "/assets/default.jpg"
    end
  end

end
