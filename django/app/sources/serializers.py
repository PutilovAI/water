from .models import Source
from rest_framework import serializers

class SourceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Source
        exclude = ('created',)

        # fields = ('id', 'title', 'address', 'type', 'distance')
# class SourceSingleSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Source
#         fields = ('__all__')
#         # fields = ('id', 'title', 'address', 'type', 'distance')
