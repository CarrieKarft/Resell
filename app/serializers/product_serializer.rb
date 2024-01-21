class ProductSerializer < ActiveModel::Serializer
  attributes :id, :description, :minimum_price, :image, :image_url, :highest_bid, :product_name
  # might change highest bid to be a controller action so can repetedly fetch since it will change frequently, but this is fine for now

  has_many :comments
  has_many :bids
end
