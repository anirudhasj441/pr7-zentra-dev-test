from django.contrib import admin
from .models import IntrestRequest
# Register your models here.

class IntrestRequestAdmin(admin.ModelAdmin):
    list_display = [
        "request_from",
        "request_to",
        "status"
    ]
    
admin.site.register(IntrestRequest, IntrestRequestAdmin)