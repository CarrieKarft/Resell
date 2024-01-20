class ProductSerializer < ActiveModel::Serializer
  attributes :id, :description, :minimum_price, :image, :image_url

  has_many :comments
  has_many :bids
end
