class Comment < ApplicationRecord
    validates :comment, presence: true, length: {maximum: 300}

    belongs_to :user
    belongs_to :product
end
