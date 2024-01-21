class AddNameToProduct < ActiveRecord::Migration[6.1]
  def change
    add_column :products, :product_name, :string
  end
end
