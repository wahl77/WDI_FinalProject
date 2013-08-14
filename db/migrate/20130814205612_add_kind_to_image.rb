class AddKindToImage < ActiveRecord::Migration
  def change
    add_column :images, :kind, :string, :default => "default"
  end
end
