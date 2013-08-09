class CreateSomeTests < ActiveRecord::Migration
  def change
    create_table :some_tests do |t|
      t.integer :i

      t.timestamps
    end
  end
end
