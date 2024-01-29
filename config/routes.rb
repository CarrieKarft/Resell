Rails.application.routes.draw do

    resources :bids, only: [:create, :update]
    patch '/accept_bid/:id', to: "bids#accept_bid"
    resources :comments, only: [:create, :update, :destroy]
    resources :products, only: [:show, :index, :create, :update, :destroy]
    resources :users, only: [:index]
    delete '/user_product_delete/:id', to: "products#user_product_delete"
    post '/signup', to: "users#create"
    get '/me', to: "users#show"
    delete '/logout', to: "sessions#destroy"
    post '/login', to: "sessions#create"

  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
