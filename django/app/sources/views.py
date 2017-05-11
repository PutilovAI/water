# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import django_filters
from django_filters import NumberFilter, ModelMultipleChoiceFilter, MultipleChoiceFilter

from rest_framework.filters import OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend, FilterSet

from django.db.models import Max, Min
from rest_framework.views import APIView
from rest_framework.response import Response

from rest_framework import viewsets
from .serializers import SourceSerializer, SourcePhotoSerializer
from .models import Source, SourcePhoto


class SourceFilterLimits(APIView):

    def get(self, request, *args, **kwargs):
        limits = Source.objects.aggregate(Max('distance'), Min('distance'), Max('rating'), Min('rating'), Max('pressure'), Min('pressure'), Max('waiting'), Min('waiting'))
        return Response(limits)


class SourceFilter(FilterSet):
    type         = MultipleChoiceFilter(choices=Source.TYPES)
    distance_min = NumberFilter(name="distance", lookup_expr='gte')
    distance_max = NumberFilter(name="distance", lookup_expr='lte')
    rating_min   = NumberFilter(name="rating", lookup_expr='gte')
    rating_max   = NumberFilter(name="rating", lookup_expr='lte')
    pressure_min = NumberFilter(name="pressure", lookup_expr='gte')
    pressure_max = NumberFilter(name="pressure", lookup_expr='lte')
    waiting_min  = NumberFilter(name="waiting", lookup_expr='gte')
    waiting_max  = NumberFilter(name="waiting", lookup_expr='lte')

    class Meta:
        model = Source
        fields = [
            'type',
            'analiz',
            'distance_min',
            'distance_max',
            'rating_min',
            'rating_max',
            'pressure_min',
            'pressure_max',
            'waiting_min',
            'waiting_max',
            ]

class SourceViewSet(viewsets.ModelViewSet):
    queryset = Source.objects.all()
    serializer_class = SourceSerializer
    filter_class = SourceFilter
    filter_backends = [DjangoFilterBackend, OrderingFilter, ]
    ordering_fields = ('distance', 'rating', 'pressure')

class SourcePhotoViewSet(viewsets.ModelViewSet):
    queryset = SourcePhoto.objects.all()
    serializer_class = SourcePhotoSerializer
