class BidSerializer < ActiveModel::Serializer
  attributes :id, :bid_amount, :product_id, :bid_accepted
end
