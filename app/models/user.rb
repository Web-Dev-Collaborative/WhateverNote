class User < ApplicationRecord
    validates :password_digest, :first_name, :last_name, presence: true
    validates :email, :session_token, presence: true, uniqueness: true
    validates :password, length: {minimum: 6, allow_nil: true}

    has_many :notes,
        foreign_key: :author_id,
        class_name: :Note,
        dependent: :destroy

    has_many :notebooks,
        foreign_key: :author_id,
        class_name: :Notebook,
        dependent: :destroy

    after_initialize :ensure_session_token

    attr_reader :password

    def self.find_by_credentials(email, password)
        @user = User.find_by(email: email)
        return nil if !@user
        return @user if @user.is_password?(password)
    end

    def self.generate_session_token
        SecureRandom.urlsafe_base64
    end

    def is_password?(password)
        BCrypt::Password.new(self.password_digest).is_password?(password)
    end

    def password=(password)
        @password=password
        self.password_digest = BCrypt::Password.create(password)
    end

    def ensure_session_token
        self.session_token ||= User.generate_session_token
    end

    def reset_session_token!
        self.session_token = User.generate_session_token
        self.save!
        self.session_token
    end

end
