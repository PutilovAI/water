# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

class SourcePhoto(models.Model):
    # created  = models.DateTimeField(auto_now_add=True)
    title    = models.CharField(max_length=100, default='')

    class Meta:
        verbose_name = 'Фото источника'
        verbose_name_plural = 'Фото источников'

    def __str__(self):
        return self.title

class Source(models.Model):
    TYPES = (
        ('rodnik', 'Родник'),
        ('kolonka', 'Колонка'),
    )

    created  = models.DateTimeField(auto_now_add=True)
    type     = models.CharField(max_length=100, choices=TYPES, default='rodnik', verbose_name='Тип источника')

    title    = models.CharField(max_length=100, default='')
    address  = models.CharField(max_length=200, default='', verbose_name='Адрес')
    latitude = models.FloatField(verbose_name='Широта', null=True)
    longitude = models.FloatField(verbose_name='Долгота', null=True)
    landmark = models.CharField(max_length=200, blank=True, default='', verbose_name='Ориентир')

    route    = models.TextField(default='', blank=True, verbose_name='Как проехать (html)')
    description = models.TextField(default='', blank=True, verbose_name='Описание (html)')

    distance = models.PositiveIntegerField(default=0, blank=True,)
    pressure = models.PositiveIntegerField(default=0, blank=True,)
    waiting   = models.PositiveIntegerField(default=0, blank=True,)

    analiz   = models.BooleanField(default=False, blank=True,)
    img      = models.ImageField(upload_to='sources', null=True, max_length=255)

    sourcephoto = models.ManyToManyField(SourcePhoto)

    rating   = models.FloatField(default=0, blank=True, editable=False)
    visitors = models.PositiveIntegerField(default=0, blank=True, editable=False)


    class Meta:
        verbose_name = 'Источник'
        verbose_name_plural = 'Источники'

    def __str__(self):
        return self.title
