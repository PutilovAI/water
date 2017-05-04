# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

class Source(models.Model):
    TYPES = (
        ('rodnik', 'Родник'),
        ('kolonka', 'Колонка'),
    )

    created  = models.DateTimeField(auto_now_add=True)
    title    = models.CharField(max_length=100, blank=True, default='')
    address  = models.CharField(max_length=200, default='')
    type     = models.CharField(max_length=100, choices=TYPES, default='rodnik', verbose_name='Тип источника')
    distance = models.PositiveIntegerField(default=0)
    pressure = models.PositiveIntegerField(default=0)
    rating   = models.FloatField(default=0)
    waiting   = models.PositiveIntegerField(default=0)
    visitors = models.PositiveIntegerField(default=0)
    # code     = models.TextField()
    analiz   = models.BooleanField(default=False)
    img      = models.ImageField(upload_to='sources', null=True, max_length=255)


    class Meta:
        verbose_name = 'Источник'
        verbose_name_plural = 'Источники'

    def __str__(self):
        return self.title
