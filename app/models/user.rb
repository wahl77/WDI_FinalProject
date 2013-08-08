class User < ActiveRecord::Base
  authenticates_with_sorcery!

  attr_accessible :username, :first_name, :last_name, :password, :password_confirmation

  has_many :follows

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

  # Get a list of all the people I am following
  # This overwrites default getters
  def followers
    Follow.where("following = ?", self.id)
  end

  # Get a list of all the people that follow me
  # This overwrites default getters
  def following
    Follow.where("follower = ?", self.id)
  end

end
