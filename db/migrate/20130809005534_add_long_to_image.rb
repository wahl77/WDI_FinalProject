class AddLongToImage < ActiveRecord::Migration
  def change
    add_column :images, :long, :decimal
  end
end
