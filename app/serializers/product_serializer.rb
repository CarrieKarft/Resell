class ProductSerializer < ActiveModel::Serializer
  attributes :id, :description, :minimum_price, :image, :image_url, :highest_bid, :product_name


  has_many :comments
end
