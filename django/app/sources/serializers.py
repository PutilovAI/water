from .models import Source
from rest_framework import serializers

class SourceSingleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Source
        fields = ('id', 'title', 'address', '_type', 'distance')
