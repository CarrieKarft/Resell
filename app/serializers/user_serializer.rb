class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :email

  has_many :bids
  has_many :products
end
