from rest_framework import serializers

from .models import User

class CreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"
        extra_kwargs = {
            "password": {"write_only": True}  
        }

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)
    

class UserSerializer(serializers.ModelSerializer):
    new_password = serializers.CharField(write_only=True, required=False, allow_blank=True)
    class Meta:
        model = User
        fields = ["email", "username", "avatar", "new_password", "password"]
        read_only_fields = ["id"]