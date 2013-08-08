RailsProject::Application.routes.draw do
  root :to => 'static_pages#index'

  resources :sessions, only:[:new, :create, :destroy]
end
