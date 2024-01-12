class BidSerializer < ActiveModel::Serializer
  attributes :id, :bid_amount, :bid, :user_id, :product_id
end
