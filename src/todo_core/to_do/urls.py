from rest_framework.routers import DefaultRouter

from to_do.views import ToDoViewSet

router = DefaultRouter(trailing_slash=False)

router.register("", ToDoViewSet, basename='user')

urlpatterns = router.urls
