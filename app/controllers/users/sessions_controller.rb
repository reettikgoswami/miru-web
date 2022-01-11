# frozen_string_literal: true

class Users::SessionsController < Devise::SessionsController
  def after_sign_in_path_for(resource)
    if resource.is_a?(User)
      return new_company_path if resource.company.nil? && resource.owner?

      if resource.admin? || resource.owner?
        dashboard_index_path
      else
        time_tracking_index_path
      end
    else
      super
    end
  end
end