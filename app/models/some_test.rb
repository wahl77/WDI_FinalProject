class SomeTest < ActiveRecord::Base
  attr_accessible :i

  def self.maintain
    SomeTest.first.increase
  end

  def increase
    self.i = self.i + 1
    save
  end
end
