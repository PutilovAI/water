# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework import viewsets
from .serializers import SourceSingleSerializer
from .models import Source

class SourceViewSet(viewsets.ModelViewSet):
    queryset = Source.objects.all()
    serializer_class = SourceSingleSerializer
