from rest_framework import serializers
from .models import Team, User, Activity, Workout, Leaderboard
from bson import ObjectId

class ObjectIdField(serializers.Field):
    """Custom field to handle MongoDB ObjectId serialization"""
    def to_representation(self, value):
        if isinstance(value, ObjectId):
            return str(value)
        return str(value) if value else None
    
    def to_internal_value(self, data):
        try:
            return ObjectId(data)
        except Exception:
            raise serializers.ValidationError('Invalid ObjectId')

class TeamSerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()
    
    class Meta:
        model = Team
        fields = ['id', 'name', 'description']
    
    def get_id(self, obj):
        return str(obj.id) if obj.id else None

class UserSerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()
    team = serializers.SerializerMethodField()
    
    class Meta:
        model = User
        fields = ['id', 'name', 'email', 'team']
    
    def get_id(self, obj):
        return str(obj.id) if obj.id else None
    
    def get_team(self, obj):
        return str(obj.team_id) if hasattr(obj, 'team_id') and obj.team_id else None

class ActivitySerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()
    user = serializers.SerializerMethodField()
    
    class Meta:
        model = Activity
        fields = ['id', 'user', 'type', 'duration', 'calories', 'date']
    
    def get_id(self, obj):
        return str(obj.id) if obj.id else None
    
    def get_user(self, obj):
        return str(obj.user_id) if hasattr(obj, 'user_id') and obj.user_id else None

class WorkoutSerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()
    
    class Meta:
        model = Workout
        fields = ['id', 'name', 'description', 'difficulty']
    
    def get_id(self, obj):
        return str(obj.id) if obj.id else None

class LeaderboardSerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()
    team = serializers.SerializerMethodField()
    
    class Meta:
        model = Leaderboard
        fields = ['id', 'team', 'points']
    
    def get_id(self, obj):
        return str(obj.id) if obj.id else None
    
    def get_team(self, obj):
        return str(obj.team_id) if hasattr(obj, 'team_id') and obj.team_id else None
