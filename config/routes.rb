RailsProject::Application.routes.draw do
  post "images/new" => 'images#new', :as => "new_image"


  match "oauth/callback" => "oauths#callback"
  match "oauth/:provider" => "oauths#oauth", :as => :auth_at_provider

  root :to => 'static_pages#index'

  resources :sessions, only:[:new, :create, :destroy]

  get "profile/:id" => 'users#show', :as => "profile"

end
