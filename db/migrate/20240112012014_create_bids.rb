class CreateBids < ActiveRecord::Migration[6.1]
  def change
    create_table :bids do |t|
      t.float :bid_amount
      t.boolean :bid_accepted
      t.integer :user_id
      t.integer :product_id

      t.timestamps
    end
  end
end
