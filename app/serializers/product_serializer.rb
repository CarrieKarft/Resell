class ProductSerializer < ActiveModel::Serializer
  attributes :id, :description, :image, :image_url, :product_name, :current_highest_bid


  has_many :comments
end
