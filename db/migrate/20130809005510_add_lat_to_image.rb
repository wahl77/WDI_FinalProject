class AddLatToImage < ActiveRecord::Migration
  def change
    add_column :images, :lat, :decimal
  end
end
