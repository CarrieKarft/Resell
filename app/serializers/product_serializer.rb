class ProductSerializer < ActiveModel::Serializer
  attributes :id, :description, :minimum_price
end
